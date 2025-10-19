package com.omoda.kassa.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class CashChangeController {

    @PostMapping("/api/cash-change")
    public CashChangeResponse getCashChange(@RequestBody CashChangeRequest request) {
        BigDecimal totalPrice = request.totalPrice();
        BigDecimal cashPaid = request.cashPaidAmount();
        String currency = request.cashPaidCurrency();

        validateCashChangeRequest(totalPrice, cashPaid);

        BigDecimal changeAmount = cashPaid.subtract(totalPrice);

        Map<String, Integer> changeNotes = calculateDenominations(changeAmount, notes);
        Map<String, Integer> changeCoins = calculateDenominations(
                getRemainingAmount(changeAmount, notes), coins);

        return new CashChangeResponse(changeNotes, changeCoins, changeAmount, currency);
    }

    // AI
    private Map<String, Integer> calculateDenominations(BigDecimal amount, BigDecimal[] denominations) {
        Map<String, Integer> result = new LinkedHashMap<>();
        BigDecimal remaining = amount;

        for (BigDecimal denomination : denominations) {
            if (remaining.compareTo(denomination) >= 0) {
                int count = remaining.divide(denomination, 0, RoundingMode.DOWN).intValue();
                if (count > 0) {
                    result.put(denomination.toPlainString(), count);
                    remaining = remaining.subtract(denomination.multiply(new BigDecimal(count)));
                }
            }
        }

        return result;
    }

    // AI
    private BigDecimal getRemainingAmount(BigDecimal amount, BigDecimal[] denominations) {
        BigDecimal remaining = amount;

        for (BigDecimal denomination : denominations) {
            if (remaining.compareTo(denomination) >= 0) {
                int count = remaining.divide(denomination, 0, RoundingMode.DOWN).intValue();
                remaining = remaining.subtract(denomination.multiply(new BigDecimal(count)));
            }
        }

        return remaining;
    }

    public record CashChangeRequest(
            BigDecimal totalPrice,
            BigDecimal cashPaidAmount,
            String cashPaidCurrency) {
    }

    private void validateCashChangeRequest(BigDecimal totalPrice, BigDecimal cashPaidAmount) {
        if (totalPrice == null || cashPaidAmount == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Price and cash paid amount are required");
        }

        if (totalPrice.compareTo(cashPaidAmount) > 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not enough money was paid!");
        }
    }

    public record CashChangeResponse(
            Map<String, Integer> changeNotes,
            Map<String, Integer> changeCoins,
            BigDecimal totalChange,
            String currency) {
    }

    private static final BigDecimal[] notes = {
            new BigDecimal("100"), new BigDecimal("50"), new BigDecimal("20"),
            new BigDecimal("10"), new BigDecimal("5")
    };

    private static final BigDecimal[] coins = {
            new BigDecimal("2"), new BigDecimal("1"), new BigDecimal("0.50"),
            new BigDecimal("0.20"), new BigDecimal("0.10"), new BigDecimal("0.05"),
            new BigDecimal("0.02"), new BigDecimal("0.01")
    };
}