package com.ssafy.gaese.global.util;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class TimeUtil {
    public static String getNowDateTime()
    {
        LocalDateTime now = LocalDateTime.now();
        String formatedNow = now.format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));

        return formatedNow;
    }
    public static int forTypingSpeedTime()
    {
        LocalTime now = LocalTime.now();
        int minute = now.getMinute();
        int second = now.getSecond();

        return minute*60+second;

    }
}
