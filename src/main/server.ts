import 'module-alias/register'

import setupApp from '@main/config/app'
import env from '@main/config/env'

const app = setupApp()

app.listen(env.port, () => {
    console.log('Server is listening on port: ' + env.port)
})

