import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port: number = parseInt(process.env.PORT);
  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(port);
  console.log(`Listening on port: ${port}`);
}
bootstrap();
