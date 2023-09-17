import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Patient extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public documentType: string

  @column()
  public documentId: string

  @column()
  public firstName: string

  @column()
  public secondName: string

  @column()
  public fatAverage: number

  @column()
  public suggarAverage: number

  @column()
  public oxygenAverage: number

  @column()
  public risk: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
