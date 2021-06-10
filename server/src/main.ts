import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";


const bootstrap = async () => {
    try {
      const PORT=process.env.PORT || 5001;
        const app = await NestFactory.create(AppModule);

        const config = new DocumentBuilder()
            .setTitle("Torrent")
            .setDescription("Документация REST API")
            .setVersion('1.0.0')
            .addTag("mip92")
            .build()

        const document = SwaggerModule.createDocument(app, config)

        SwaggerModule.setup("/api/docs", app, document)
          app.enableCors()
        app.useGlobalPipes(new ValidationPipe())
        await app.listen(PORT, ()=>console.log(`server started on PORT ${PORT}`));
    } catch (e) {
        console.log(e)
    }
}
bootstrap();
