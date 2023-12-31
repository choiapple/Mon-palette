package com.palette.palette.domain.feed.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.feed.dto.detail.FeedDetailResDto;
import com.palette.palette.domain.feed.dto.image.FeedImageResDto;
import com.palette.palette.domain.feed.dto.list.FeedReqDto;
import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.feed.entity.FeedImage;
import com.palette.palette.domain.feed.repository.FeedRepository;
import com.palette.palette.domain.feed.service.FeedService;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import com.palette.palette.jwt.JwtTokenProvider;
import com.palette.palette.jwt.PrincipalDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

@Tag(name = "피드 API")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/feed")
public class FeedController {

    private final FeedService feedService;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;


    /**
     * 메인 피드 목록 조회
     */
    @Operation(summary = "메인 피드 목록 조회")
    @GetMapping("/main")
    public BaseResponse mainFeedList(
            @RequestParam("page") int page,
            HttpServletRequest request
    ) {

        System.out.println("메인 피드 목록 조회 컨트롤러");
        
        try {
            /////////////////////// 토큰으로 인가된 사용자 정보 처리하는 로직
            String token = jwtTokenProvider.resolveToken(request);
            jwtTokenProvider.validateToken(token);

            System.out.println("token >>> " + token);

            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            User user = userRepository.findByEmail(userDetails.getUsername()).get();

            // 유저 예외처리 :: 예외처리 커스텀 필요
            if (user == null) {
                throw new UserPrincipalNotFoundException("유효한 사용자가 아닙니다.");
            }

            return BaseResponse.success(feedService.mainFeedList(page, 10, user));
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("메인 피드 목록 조회 실패");
        }
    }

    /**
     * 피드 목록 조회
     */
    @Operation(summary = "일반 피드 목록 조회")
    @GetMapping()
    public BaseResponse feedList(
            @RequestParam("page") int page,
            @RequestParam(value = "color", required = false) String color,
            @RequestParam(value = "orderBy", required = false) String orderBy,
            HttpServletRequest request
    ) {

        System.out.println("메인 피드 목록 조회 컨트롤러");

        try {
            return BaseResponse.success(feedService.feedList(page, 10, color, orderBy));
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("메인 피드 목록 조회 실패");
        }
    }


    /**
     * 피드 생성
     * ++ 유저 넣어야 함.
     */
    @Operation(summary = "피드 생성")
    @PostMapping()
    public BaseResponse feedCreate(
            @RequestBody FeedReqDto feedReqDto,
            HttpServletRequest request

    ) {
        System.out.println("피드 생성 로직");

        try {
            //////////////////////// 토큰으로 인가된 사용자 정보 처리하는 로직
            String token = jwtTokenProvider.resolveToken(request);
            jwtTokenProvider.validateToken(token);

            System.out.println("token >>> " + token);

            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            User user = userRepository.findByEmail(userDetails.getUsername()).get();

            // 유저 예외처리 :: 예외처리 커스텀 필요
            if (user == null) {
                throw new UserPrincipalNotFoundException("유효한 사용자가 아닙니다.");
            }


            return BaseResponse.success(feedService.feedCreate(feedReqDto, feedReqDto.getFeedImages(), user));
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("피드 생성 실패");
        }
    }

    /**
     * 피드 상세 조회
     */
    @Operation(summary = "피드 상세 조회")
    @GetMapping("/{id}")
    public BaseResponse feedDetail(
            @PathVariable("id") Long feedId,
            HttpServletRequest request
    ) {
        System.out.println("피드 상세 조회 로직");

        try {

            //////////////////////// 토큰으로 인가된 사용자 정보 처리하는 로직
            String token = jwtTokenProvider.resolveToken(request);
            jwtTokenProvider.validateToken(token);

            System.out.println("token >>> " + token);

            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            Long currentUserId = userRepository.findByEmail(userDetails.getUsername()).get().getId();

            // 유저 예외처리 :: 예외처리 커스텀 필요
            if (currentUserId == null) {
                throw new UserPrincipalNotFoundException("유효한 사용자가 아닙니다.");
            }

            FeedDetailResDto feedDetail = feedService.feedDetail(feedId, currentUserId);
            return BaseResponse.success(feedDetail);
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("피드 상세 조회 실패");
        }
    }

    /**
     * 피드 수정
     */
    @Operation(summary = "피드 수정")
    @PutMapping("/{id}")
    public BaseResponse feedUpdate(
            @PathVariable("id") Long feedId,
            @RequestBody FeedReqDto feedReqDto,
            HttpServletRequest request
    ) {
        try {
            //////////////////////// 토큰으로 인가된 사용자 정보 처리하는 로직
            String token = jwtTokenProvider.resolveToken(request);
            jwtTokenProvider.validateToken(token);

            System.out.println("token >>> " + token);

            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            Long currentUserId = userRepository.findByEmail(userDetails.getUsername()).get().getId();

            // 유저 예외처리 :: 예외처리 커스텀 필요
            if (currentUserId == null) {
                throw new UserPrincipalNotFoundException("유효한 사용자가 아닙니다.");
            }

            // 게시글 작성자의 이메일 가져옴
            Long feedUserId = feedService.getFeedUserId(feedId);

            System.out.println("feedUserId >>> " + feedUserId);

            // 작성자와 현재 유저가 일치한지 처리하는 로직
            if (! currentUserId.equals(feedUserId)) {
                throw new UserPrincipalNotFoundException("작성자와 현재 사용자가 일치하지 않습니다.");
            }


            // 데이터의 수정
            FeedReqDto feedDto = FeedReqDto.builder()
                    .content(feedReqDto.getContent())
                    .hashtags(feedReqDto.getHashtags())
                    .feedImages(feedReqDto.getFeedImages())
                    .build();

            // DB에 저장되어 있는 파일 가져오기
            List<FeedImageResDto> feedImages = feedService.findAllByFeed(feedId);

            return BaseResponse.success(feedService.feedUpdate(feedDto, feedImages, feedId));
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("피드 수정 실패");
        }
    }

    /**
     * 피드 삭제
     */
    @Operation(summary = "피드 삭제")
    @DeleteMapping("/{id}")
    public BaseResponse feedDelete(
            @PathVariable("id") Long feedId,
            HttpServletRequest request
    ) {
        try {

            //////////////////////// 토큰으로 인가된 사용자 정보 처리하는 로직
            String token = jwtTokenProvider.resolveToken(request);
            jwtTokenProvider.validateToken(token);

            System.out.println("token >>> " + token);

            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            Long currentUserId = userRepository.findByEmail(userDetails.getUsername()).get().getId();

            // 유저 예외처리 :: 예외처리 커스텀 필요
            if (currentUserId == null) {
                throw new UserPrincipalNotFoundException("유효한 사용자가 아닙니다.");
            }

            // 게시글 작성자의 이메일 가져옴
            Long feedUserId = feedService.getFeedUserId(feedId);

            System.out.println("feedUserId >>> " + feedUserId);

            // 작성자와 현재 유저가 일치한지 처리하는 로직
            if (! currentUserId.equals(feedUserId)) {
                throw new UserPrincipalNotFoundException("작성자와 현재 사용자가 일치하지 않습니다.");
            }

            feedService.feedDelete(feedId);

            return BaseResponse.success(true);
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("피드 삭제 실패");
        }
    }
}
