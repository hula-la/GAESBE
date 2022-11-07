package com.ssafy.gaese.domain.typing.common;

import java.time.LocalTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Random;

public class TypingStaticData {
    public static HashMap<String, TypingRoomData> typingRoom = new HashMap<>();
    //레디스에선 전체로 검색 가능하도록 구현 해야함
    //ex) isPlay Hash<id, bool>
    public static HashSet<String> isPlay = new HashSet<>();

    //만약 이미 있다면 다시 랜덤 돌려서 생성
    public static HashSet<String> roomCodeCheck = new HashSet<>();

    public static String roomCodeMaker()
    {
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 8;
        Random random = new Random();
        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        return generatedString;
    }

    public static Integer timeMaker()
    {
        LocalTime now = LocalTime.now();
        int minute = now.getMinute();
        int second = now.getSecond();

        return minute*60+second;

    }
}
