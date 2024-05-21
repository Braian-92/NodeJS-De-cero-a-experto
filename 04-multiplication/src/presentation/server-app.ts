import { CreateTable } from '../domain/uses-cases/create-table.use-case'
import { SaveFile } from '../domain/uses-cases/save-file.use-case'

interface RunOptions {
  base: number
  limit: number
  showTable: boolean
}

export class ServerApp {
  static run({ base, limit, showTable }: RunOptions) {
    console.log('Server running...')

    const table = new CreateTable().execute({ base, limit })
    const wasCreated = new SaveFile().execute({
      fileContent: table,
      fileDestination: `outputs/r_table-${base}`
    })

    if (showTable) {
      console.log(table)
    }

    wasCreated
      ? console.log('File created!')
      : console.error('File not created!')
  }
}
