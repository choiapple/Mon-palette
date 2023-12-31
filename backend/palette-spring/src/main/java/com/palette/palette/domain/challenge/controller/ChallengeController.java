package com.palette.palette.domain.challenge.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.challenge.dto.create.ChallengeCreateReqDto;
import com.palette.palette.domain.challenge.repository.ChallengeRepository;
import com.palette.palette.domain.challenge.service.ChallengeService;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import com.palette.palette.domain.user.service.UserService;
import com.palette.palette.jwt.JwtTokenProvider;
import io.jsonwebtoken.Jwt;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.handler.SimpleUrlHandlerMapping;

import java.nio.file.attribute.UserPrincipalNotFoundException;


@Tag(name = "챌린지 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/challenge")
@Slf4j
public class ChallengeController {

    private final ChallengeService challengeService;
    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 챌린지 목록 조회
     * @param page
     */
    @Operation(summary = "챌린지 목록 조회")
    @GetMapping()
    public BaseResponse challengeList(
            @RequestParam("page") int page,
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

            return BaseResponse.success(challengeService.list(page, 10, currentUserId));
        } catch (Exception e) {
            return BaseResponse.error("챌린지 목록 조회 실패");
        }
    }

    /**
     * 챌린지 생성
     */
    @Operation(summary = "챌린지 생성")
    @PostMapping()
    public BaseResponse challengeCreate(
            @RequestBody ChallengeCreateReqDto challengeCreateReqDto,
            HttpServletRequest request
            ) {
        System.out.println("챌린지 생성 컨트롤러");

        try {
            //////////////////////// 토큰으로 인가된 사용자 정보 처리하는 로직
            String token = jwtTokenProvider.resolveToken(request);
            jwtTokenProvider.validateToken(token);

            System.out.println("token >>> " + token);

            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            User user = userRepository.findByEmail(userDetails.getUsername()).get();

            challengeService.create(challengeCreateReqDto, user);

            return BaseResponse.success(true);

        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("error");
        }
    }


    /**
     * 챌린지 인기 조회 :: 10개
     */
    @Operation(summary = "챌린지 인기 조회 10개")
    @GetMapping("/best")
    BaseResponse challengeBest(
            HttpServletRequest request
    ) {
        System.out.println("챌린지 인기 조회 컨트롤러");

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

            return BaseResponse.success(challengeService.best());
        } catch (Exception e) {

            e.printStackTrace();
            return BaseResponse.error("챌린지 인기 조회 실패");
        }
    }


    /**
     * 챌린지 팔로우 최근 조회
     */
    @Operation(summary = "챌린지 팔로우 최근 조회")
    @GetMapping("/recent")
    public BaseResponse challengeRecentFollow(
            HttpServletRequest request
    ) {
        System.out.println("챌린지 팔로우 최근 목록 조회");

        try {
            //////////////////////// 토큰으로 인가된 사용자 정보 처리하는 로직
            String token = jwtTokenProvider.resolveToken(request);
            jwtTokenProvider.validateToken(token);

            System.out.println("token >>> " + token);

            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            User user = userRepository.findByEmail(userDetails.getUsername()).get();

            // 유저 예외처리 :: 예외처리 커스텀 필요
            if (user.getId() == null) {
                throw new UserPrincipalNotFoundException("유효한 사용자가 아닙니다.");
            }

            return BaseResponse.success(challengeService.recent(user.getEmail()));
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("챌린지 팔로우 최근 조회 실패");
        }
    }


    /**
     * 챌린지 상세 조회
     */
    @Operation(summary = "챌린지 상세 조회")
    @GetMapping("/{id}")
    public BaseResponse challengeDetail(
            @PathVariable("id") Long challengeId,
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

            return BaseResponse.success(challengeService.detail(challengeId, currentUserId));
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("챌린지 상세 조회 실패");
        }
    }

    /**
     * 챌린지 수정
     */
    @Operation(summary = "챌린지 수정")
    @PutMapping("/{id}")
    public BaseResponse challengeUpdate(
            @PathVariable("id") Long challengeId,
            @RequestBody ChallengeCreateReqDto challengeCreateReqDto,
            HttpServletRequest request
    ) {
        System.out.println("챌린지 수정 컨트롤러");

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

            // 챌린지 작성자의 이메일을 가져옴
            Long challengeUserId = challengeRepository.findByChallengeUserId(challengeId);

            if (! currentUserId.equals(challengeUserId)) {
                throw new UserPrincipalNotFoundException("작성자와 현재 사용자가 일치하지 않습니다.");
            }

            // 데이터 수정
            ChallengeCreateReqDto dto = ChallengeCreateReqDto.builder()
                    .video(challengeCreateReqDto.getVideo())
                    .content(challengeCreateReqDto.getContent())
                    .build();

            challengeService.update(dto, challengeId);

            return BaseResponse.success(true);

        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("챌린지 수정 실패");
        }
    }

    @Operation(summary = "챌린지 삭제")
    @DeleteMapping("{id}")
    public BaseResponse challengeDelete(
            @PathVariable("id") Long challengeId,
            HttpServletRequest request
    ) {
        System.out.println("챌린지 삭제 컨트롤러");

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

            // 챌린지 작성자의 이메일을 가져옴
            Long challengeUserId = challengeRepository.findByChallengeUserId(challengeId);

            if (! currentUserId.equals(challengeUserId)) {
                throw new UserPrincipalNotFoundException("작성자와 현재 사용자가 일치하지 않습니다.");
            }

            challengeService.delete(challengeId);

            return BaseResponse.success(true);
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("챌린지 삭제 실패");
        }
    }
}
