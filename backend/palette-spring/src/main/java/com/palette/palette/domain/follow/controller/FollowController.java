package com.palette.palette.domain.follow.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.follow.service.FollowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/follow")
@Tag(name = "팔로우 API")
@RequiredArgsConstructor
@Slf4j
public class FollowController {


    private final FollowService followService;

    @Operation(summary = "팔로잉 걸기")
    @PostMapping("/{id}")
    public BaseResponse followUser(HttpServletRequest request, @PathVariable("id") Long followingId){
        System.out.println("팔로우 걸기 컨트롤러");
        try {
            return BaseResponse.success(followService.followUser(request, followingId));
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("팔로잉 걸기 실패");
        }

    }

    @Operation(summary = "해당 유저의 팔로워 유저 목록 조회")
    @GetMapping("/follower/{id}")
    public BaseResponse getFollowerList(HttpServletRequest request, @PathVariable("id") Long userId){
        try{
            return BaseResponse.success(followService.getFollowerList(request, userId));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("팔로워 유저 목록 조회 실패");
        }
    }
    @Operation(summary = "해당 유저의 팔로잉 유저 목록 조회")
    @GetMapping("/following/{id}")
    public BaseResponse getFollowingList(HttpServletRequest request, @PathVariable("id") Long userId){
        try{
            return BaseResponse.success(followService.getFollowingList(request, userId));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("팔로잉 유저 목록 조회 실패");
        }
    }


}
