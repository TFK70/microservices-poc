import { NestLogger }                     from '@atls/nestjs-logger'
import { NestFactory }                    from '@nestjs/core'

import { PrivateGatewayEntrypointModule } from './private-gateway-entrypoint.module'

declare const module: any

const bootstrap = async () => {
  const app = await NestFactory.create(PrivateGatewayEntrypointModule, {
    logger: new NestLogger(),
  })

  app.enableShutdownHooks()

  await app.listen(3000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

bootstrap()
