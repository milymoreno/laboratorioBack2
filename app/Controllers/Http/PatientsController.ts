/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Patient from 'App/Models/Patient'

function calculateRiskLevel(fatAverage: number, suggarAverage: number, oxygenAverage: number) {
  // Manejar el caso de valores fuera del rango válido (0-100)
  if (
    suggarAverage < 0 ||
    suggarAverage > 100 ||
    fatAverage < 0 ||
    fatAverage > 100 ||
    oxygenAverage < 0 ||
    oxygenAverage > 100
  ) {
    return 'VALORES INVÁLIDOS'
  }

  if (fatAverage > 88.5 && suggarAverage > 70 && oxygenAverage < 60) {
    return 'ALTO'
  }

  if (
    fatAverage >= 62.2 &&
    fatAverage <= 88.5 &&
    suggarAverage >= 50 &&
    suggarAverage <= 70 &&
    oxygenAverage >= 60 &&
    oxygenAverage <= 70
  ) {
    return 'MEDIO'
  }

  if (fatAverage < 62.2 && suggarAverage < 50 && oxygenAverage > 70) {
    return 'BAJO'
  }

  // Manejar cualquier otro caso aquí si es necesario

  return 'NIVEL DESCONOCIDO' // En caso de que ninguna condición se cumpla
}

export default class PatientsController {
  public async index({}: HttpContextContract) {
    try {
      const patients = await Database.from('patients').select('*')
      const response = {
        success: true,
        data: patients,
      }
      return JSON.stringify(response)
    } catch (error) {
      return { succes: false, data: [] }
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const {
      document_id,
      document_type,
      first_name,
      second_name,
      fat_average,
      suggar_average,
      oxygen_average,
    } = request.body()

    if (!document_type) {
      return response.json({
        message: 'Tipo de documento es requerido',
        success: false,
      })
    }

    if (!document_id) {
      return response.json({
        message: 'Numero de documento es requerido',
        success: false,
      })
    }

    if (!first_name) {
      return response.json({
        message: 'El nombre es requerido',
        success: false,
      })
    }

    if (!second_name) {
      return response.json({
        message: 'El apellido es requerido',
        success: false,
      })
    }

    if (fat_average === null || fat_average === undefined || fat_average === '') {
      return response.json({
        message: 'Porcentaje de grasa es requerido',
        success: false,
      })
    }

    if (suggar_average === null || suggar_average === undefined || suggar_average === '') {
      return response.json({
        message: 'Porcentaje de azucar es requerido',
        success: false,
      })
    }

    if (oxygen_average === null || oxygen_average === undefined || oxygen_average === '') {
      return response.json({
        message: 'Porcentaje de oxigeno es requerido',
        success: false,
      })
    }

    if (Number.parseFloat(fat_average) < 0 || Number.parseFloat(fat_average) > 100) {
      return response.json({
        message: 'Porcentaje de grasa debe ser entre 0 y 100',
        success: false,
      })
    }

    if (Number.parseFloat(suggar_average) < 0 || Number.parseFloat(suggar_average) > 100) {
      return response.json({
        message: 'Porcentaje de azucar debe ser entre 0 y 100',
        success: false,
      })
    }

    if (Number.parseFloat(oxygen_average) < 0 || Number.parseFloat(oxygen_average) > 100) {
      return response.json({
        message: 'Porcentaje de oxigeno debe ser entre 0 y 100',
        success: false,
      })
    }

    const isExist = await Patient.query().where({ documentId: document_id }).first()

    if (isExist) {
      return response.json({
        message: `Ya existe un paciente con el documento ${document_id}`,
        success: false,
      })
    }

    await Patient.create({
      documentId: document_id,
      documentType: document_type,
      firstName: first_name,
      secondName: second_name,
      oxygenAverage: oxygen_average,
      fatAverage: fat_average,
      suggarAverage: suggar_average,
      risk: calculateRiskLevel(fat_average, suggar_average, oxygen_average),
    })

    return response.json({
      message: 'success insert patients',
      success: true,
    })
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params
    const patient = await Patient.query().where({ id: id }).firstOrFail()
    console.log('patient', patient)
    console.log('id', id)
    return response.json({
      success: true,
      data: patient,
    })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
