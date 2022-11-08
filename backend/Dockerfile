FROM openjdk:11-jdk-slim as builder


WORKDIR /usr/src
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
COPY chrome chrome
RUN chmod +x ./gradlew
RUN ./gradlew bootJar


FROM openjdk:11-jdk-slim
WORKDIR /usr/src
COPY --from=builder build/libs/*.jar app.jar
ENTRYPOINT ["java","-jar","-Dspring.profiles.active=gcp","/app.jar"]
EXPOSE 8081