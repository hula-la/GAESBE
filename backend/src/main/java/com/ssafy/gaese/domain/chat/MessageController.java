package com.ssafy.gaese.domain.chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

@RestController
public class MessageController {

    //@EnableWebSocketMessageBroker를 통해서 등록되는 Bean이다. Broker로 메시지를 전달한다.
    private final SimpMessagingTemplate simpMessagingTemplate;

    public MessageController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }
    @MessageMapping("/") // prefix 와 합쳐진다
    @SendTo("/topic/greetings") // broadcast to
    public Greeting greetingTest(Message message) throws Exception{
        Thread.sleep(1000);
        simpMessagingTemplate.convertAndSend("/topic/greetings/"+message.getName());
        return new Greeting("Hello"+ HtmlUtils.htmlEscape(message.getName())+"!");
    }
    @MessageMapping("/hello") // prefix 와 합쳐진다
    @SendTo("/topic/greetings") // broadcast to
    public Greeting greeting(Message message) throws Exception{
        Thread.sleep(1000);
        simpMessagingTemplate.convertAndSend("/topic/greetings/"+message.getName());
        return new Greeting("Hello"+ HtmlUtils.htmlEscape(message.getName())+"!");
    }
}
