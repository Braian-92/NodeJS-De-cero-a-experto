import { SaveFile } from './save-file.use-case'
import fs from 'fs'

describe('SaveCaseFile', () => {
  const customOptions = {
    fileContent: 'custom content',
    fileDestination: 'custom-outputs/file-destination',
    fileName: 'custom-table-name'
  }

  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.log`

  beforeEach(() => {
    //! clean up
    // fs.rmSync('outputs', { recursive: true })
  })
  afterEach(() => {
    const outputFolderExist = fs.existsSync('outputs')
    if (outputFolderExist) fs.rmSync('outputs', { recursive: true })

    const customOutputFolderExist = fs.existsSync(customOptions.fileDestination)
    if (customOutputFolderExist)
      fs.rmSync(customOptions.fileDestination, { recursive: true })
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

  test('should save file with custom values', () => {
    const saveFile = new SaveFile()

    const result = saveFile.execute(customOptions)
    expect(result).toBeTruthy()
    const fileExist = fs.existsSync(customFilePath)
    expect(fileExist).toBeTruthy()

    const fileContent = fs.readFileSync(customFilePath, {
      encoding: 'utf-8'
    })
    expect(fileContent).toBe(customOptions.fileContent)
  })

  test('should return false if directory could not be created', () => {
    const saveFile = new SaveFile()
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('Error')
    })
    
  })
})
