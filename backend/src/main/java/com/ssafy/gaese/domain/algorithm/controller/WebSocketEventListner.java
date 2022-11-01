//package com.ssafy.gaese.domain.algorithm.controller;
//
//
//import ch.qos.logback.core.net.SyslogOutputStream;
//import org.springframework.context.event.EventListener;
//import org.springframework.messaging.support.GenericMessage;
//import org.springframework.messaging.support.MessageHeaderAccessor;
//import org.springframework.messaging.support.NativeMessageHeaderAccessor;
//import org.springframework.stereotype.Component;
//import org.springframework.web.socket.messaging.SessionConnectedEvent;
//import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
//
//import java.util.List;
//import java.util.Map;
//
//
//@Component
//public class WebSocketEventListner {
//
//    @EventListener
//    public void handleWebSockerConnectionListner(SessionConnectedEvent event){
//
//        MessageHeaderAccessor accessor = NativeMessageHeaderAccessor.getAccessor(event.getMessage(), SimpMessageHeaderAccessor.class);
//        GenericMessage generic = (GenericMessage) accessor.getHeader("simpConnectMessage");
//        Map nativeHeaders = (Map)generic.getHeaders().get("nativeHeaders");
//        String sesstionId = (String) generic.getHeaders().get("simpleSessionId");
//
//        System.out.println("[Connect] room id : , seaaion id : "+sesstionId);
//
//    }
//
//}
