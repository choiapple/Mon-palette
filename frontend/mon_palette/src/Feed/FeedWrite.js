import React, { useState, useEffect } from 'react';
import './FeedWrite.css'
import axios from 'axios';
import { loginState } from '../user/components/Atom/loginState';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// AWS
import AWS from 'aws-sdk'
import uuid from 'react-uuid'
import { useRecoilValue } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

const FeedWrite = () => {
  const navigate = useNavigate()

  // 로그인 정보
  const token = useRecoilValue(loginState)

  // AWS 연동
  const ACCESS_KEY = process.env.REACT_APP_AWS_S3_ACCESS_ID
  const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_S3_ACCESS_PW
  const REGION = process.env.REACT_APP_AWS_S3_REGION
  const BUCKET = process.env.REACT_APP_AWS_S3_BUCKET

  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
  })

  const myBucket = new AWS.S3({
    params: {Bucket: BUCKET},
    region: REGION,
  })

  // 이미지 부분
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageUrlList, setImageUrlList] = useState([])
  const [update, setUpdate] = useState(false)

  // feed 설명
  const [caption, setCaption] = useState('');

  // 해시태그 부분
  const [tags, setTags] = useState('');
  const [tagList, setTagList] = useState([]);

  // 이미지 미리보기 올리기 및 제거
  const handleImageUpload = (e) => {
    const files = e.target.files
    if (!files) {
      setSelectedImages(selectedImages)
    } else {
      let imageUrlLists = [...selectedImages]

      // 선택한 이미지들의 상대경로를 imageUrlLists에 저장
      for (let i = 0; i < files.length; i++) {
        const currentImageUrl = URL.createObjectURL(files[i])
        const fileName = files[i].name
        imageUrlLists.push({
          name:fileName, 
          imageUrl:currentImageUrl,
          body: files[i]})
      }
      if (imageUrlLists.length > 10) {
        imageUrlLists = imageUrlLists.slice(0, 10);
        alert("최대 10장까지 등록 가능합니다.")
      }
      setSelectedImages(imageUrlLists)
    }
  };

  const handleRemoveImage = (imageIndex) => {
    document.querySelector("#fileUpload").disabled = false
    setSelectedImages((prevImages) => prevImages.filter((_, index) => index !== imageIndex));
  };

  // AWS에서 url 가져오기
  const handleImageUrlFromS3 = async (key) => {
    const params = {
      Bucket: BUCKET,
      Key: key,
    };
    try {
      const imageUrl = `https://${BUCKET}.s3.ap-northeast-2.amazonaws.com/${params.Key}`
      return imageUrl
    } catch (error) {
      console.log(error)
      return null
    }
  };

  // AWS로 이미지 저장하기
  const handleCreate = async (imageFileList) => {
    if (selectedImages.length === 0) {
      alert('사진을 선택하세요!!')
      return
    } else if (!caption) {
      alert('내용을 입력하세요!!')
      return
    } else {
      try {
        await Promise.all(
          imageFileList.map(async (imageFile) => {
            const replaceFileName = imageFile.name.replace(/[^A-Za-z0-9_.-]/g, "");
            const params = {
              ACL: "public-read",
              Body: imageFile.body,
              Bucket: BUCKET,
              Key: uuid() + replaceFileName,
            };

            try {
              const _temp = await myBucket.putObject(params).promise();
              const S3Url = await handleImageUrlFromS3(params.Key);
              setImageUrlList((prev) => [...prev, S3Url]);
            } catch (error) {
              console.log(error);
            }
          })
        )
        setUpdate(true)
      } catch (error) {
        console.log(error);
      }
    }
  };

  // hashTag 부분
  const handleAddTag = (e) => {
    if (e.key === "Enter") {
      const replaceTag = tags.replace(/\s/g,"")
      if(replaceTag==="") {
        alert("빈값입니다.")
      } else {
        setTagList((prev) => [...prev, replaceTag])
        setTags("")
      }
    }
  }

  useEffect(() => {
    if(tagList.length === 20) {
      document.querySelector("#hashtag_textarea").disabled = true
    }
    else {
      document.querySelector("#hashtag_textarea").disabled = false
    }
  },[tagList])

  const handleRemoveHashTag = (tagindex) => {
    setTagList((prev) => prev.filter((_, index) => index !== tagindex));
  }

  // axios 요청 보내기
  useEffect(() => {
    if (update === true) {
      handlePostFeed()
    }
    setUpdate(false)
  },[update])

  // axios 함수
  const handlePostFeed = () => {
    if (selectedImages.length === 0) {
      alert('이미지를 선택하세요')
    } else if (!caption) {
      alert('설명을 입력하세요')
    } else {
      axios
        .post(`${process.env.REACT_APP_API}/api/feed`, {
        content: caption,
        hashtags: tagList,
        feedImages: imageUrlList
        },{
          headers: { Authorization: token },
        })
        .then((response) => {
          navigate("/feed")
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  return (
    <div className="feed_write">
      <div className="feed_write_top">
        <ArrowBackIcon sx={{ fontSize: 20 }}className="feed_write_top_back"onClick={() => navigate(-1)} />
        <h2>write</h2>
        <div 
          className="feed_write_top_upload"
          onClick={() => {
            handleCreate(selectedImages)}
          }
        ><FileUploadOutlinedIcon /></div>
      </div>

      {/* feed 이미지 부분 */}
      <div className="feed_write_top_image">
        <div className="feed_write_top_image_upload">
          <label for="fileUpload" className="feed_write_top_image_label">Select Image</label>
          <input 
            className="feed_write_top_image_input"
            accept="image/*"
            multiple
            type="file" 
            onChange={handleImageUpload}
            id="fileUpload"
          />
        </div>
      
        <div className="feed_write_top_image_wrap">
          {
            selectedImages.map((image, index) => (
              <div key={index} className="feed_write_top_image_container">
                <div className="feed_write_top_image_item">
                  <img src={image.imageUrl} alt={index} />
                  <button onClick={() => handleRemoveImage(index)}>-</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* feed caption 부분 */}
      <div className="feed_write_mid">
        <textarea
          className="feed_write_mid_caption_textarea"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="문구 입력..."
        />
      </div>

      <hr className="feed_write_mid_bottom_hr"/>
      
      {/* feed 해시태그 부분 */}
      <h2 className="feed_write_bottom_h2"># Tag</h2>
      <div className="feed_write_bottom">
        <textarea 
          className="feed_write_bottom_hashtag_textarea"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="# 단어를 입력해서 나만의 tag를 만들어보세요!"
          maxLength={20}
          onKeyUp={handleAddTag}
          id="hashtag_textarea"
        />
        <div className="feed_write_bottom_hashtag_area">
          {
            tagList.map((tag, index) => {
              return <div className="feed_write_bottom_hashtag_item" key={index}># {tag}
              
              <button className="feed_write_bottom_hashtag_button" onClick={() => handleRemoveHashTag(index)}>-</button>
              </div>
            })
          }
        </div>
      </div>
    </div>
  );
};

export default FeedWrite;
