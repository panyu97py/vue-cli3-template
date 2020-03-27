import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { Notification } from 'element-ui'
export default class {
  constructor (data, type = 'dom') {
    if (type === 'dom') {
      this.wb = XLSX.utils.table_to_book(data)
    } else if (type === 'json') {
      if (!data) {
        Notification.error({
          title: '错误',
          message: '暂无数据可供导出'
        })
        return
      }
      this.initWb()
      const { sheetData, config } = this.getSheetJson(data)
      this.addSheet({ data: XLSX.utils.json_to_sheet(sheetData, config) })
    }
  }
  /** 初始化工作簿 */
  initWb () {
    this.wb = {
      SheetNames: [],
      Sheets: {},
      Props: {}
    }
  }
  /** 获取工作表 json */
  getSheetJson (data, skipHeader = true) {
    const firstChartCode = 'A'.charCodeAt()
    const dataKeys = Object.keys(data)
    const length = this.getSheetLength(data)
    // 将 code 转换为字母
    const getLetter = (code) => (String.fromCharCode(code))
    const header = dataKeys.map((key, index) => {
      return getLetter(firstChartCode + index)
    })
    const sheetData = new Array(length).fill(null)
    for (let i = 0; i <= length; i++) {
      sheetData[i] = {}
      dataKeys.map((dataKey, index) => {
        const key = getLetter(firstChartCode + index)
        // 若为第一行则将数据的属性字段作为标题
        sheetData[i][key] = ((i - 1) < 0) ? dataKey : data[dataKey][i - 1]
      })
    }
    return { sheetData, config: { header, skipHeader } }
  }
  /** 计算获取表格数据长度 */
  getSheetLength (data) {
    const getMaxOfArray = (numArray) => {
      return Math.max.apply(null, numArray)
    }
    const numArray = []
    for (let key in data) {
      numArray.push(data[key].length)
    }
    return getMaxOfArray(numArray)
  }
  /** 增加工作表 */
  addSheet ({ data, sheetName } = {}) {
    sheetName = sheetName || `Sheet${this.wb.SheetNames.length + 1}`
    this.wb.SheetNames.push(sheetName)
    this.wb.Sheets[sheetName] = data
  }
  /** 导出工作簿 */
  export () {
    /* generate workbook object from table */
    /* get binary string as output */
    var wbout = XLSX.write(this.wb, {
      bookType: 'xlsx',
      bookSST: true,
      type: 'array'
    })
    try {
      FileSaver.saveAs(
        new Blob([wbout], { type: 'application/octet-stream' }),
        'sheetjs.xlsx'
      )
    } catch (e) {
      if (typeof console !== 'undefined') console.log(e, wbout)
    }
    return wbout
  }
  encodeCell (r, c) {
    return XLSX.utils.encode_cell({ r, c })
  }
  /** 删除行 */
  deleteCol (sheetName, index) {
    const range = XLSX.utils.decode_range(this.wb.Sheets[sheetName]['!ref'])

    for (let col = index; col < range.e.c; col++) {
      for (let row = range.s.r; row <= range.e.r; row++) {
        this.wb.Sheets[sheetName][this.encodeCell(row, col)] = this.wb.Sheets[sheetName][this.encodeCell(row, col + 1)]
      }
    }

    range.e.c--

    this.wb.Sheets[sheetName]['!ref'] = XLSX.utils.encode_range(range.s, range.e)
  }
  /** 删除列 */
  deleteRow (sheetName, index) {
    const range = XLSX.utils.decode_range(this.wb.Sheets[sheetName]['!ref'])

    for (let row = index; row < range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        this.wb.Sheets[sheetName][this.encodeCell(row, col)] = this.wb.Sheets[sheetName][this.encodeCell(row + 1, col)]
      }
    }

    range.e.r--

    this.wb.Sheets[sheetName]['!ref'] = XLSX.utils.encode_range(range.s, range.e)
  }
}
