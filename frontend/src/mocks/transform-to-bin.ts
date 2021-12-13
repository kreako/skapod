import { readdir, readFile, writeFile } from "fs/promises"

const transform = async () => {
  const data = {}
  const files = await readdir("./files")
  for (const file of files) {
    console.log(file)
    const b = await readFile(`./files/${file}`)
    data[file] = b
  }
  await writeFile(
    "./bin-files.js",
    `export const files = ${JSON.stringify(data, null, 2)}`
  )
}

;(async () => {
  await transform()
})()
