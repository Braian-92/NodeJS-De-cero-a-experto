import { SaveFile } from './save-file.use-case'
import fs from 'fs'

describe('SaveCaseFile', () => {
  beforeEach(() => {
    //! clean up
    // fs.rmSync('outputs', { recursive: true })
  })
  afterEach(() => {
    fs.rmSync('outputs', { recursive: true })
  })

  test('should save file with default values', () => {
    const saveFile = new SaveFile()
    const filePath = 'outputs/table.log'
    const options = {
      fileContent: 'test content'
    }
    const result = saveFile.execute(options)

    expect(result).toBeTruthy()

    const fileExist = fs.existsSync(filePath)
    expect(fileExist).toBeTruthy()
    const fileContent = fs.readFileSync(filePath, {
      encoding: 'utf-8'
    })
    expect(fileContent).toBe(options.fileContent)
  })
})
