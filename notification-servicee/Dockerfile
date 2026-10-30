FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-Xms128m", "-Xmx256m", "-jar", "/app.jar"]