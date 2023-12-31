package com.palette.palette.domain.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartUpdateReqDto {

    private Long itemId;

    private List<CartItemOptionDto> itemOptionDtoList;
}
