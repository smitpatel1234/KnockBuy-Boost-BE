import 'reflect-metadata'

import { AppDataSource } from './infrastructure/orm/config/ormconfig'

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize().then(() => {
      console.log('Data Source has been initialized!')
    })
  }
})

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy()
  }
})
