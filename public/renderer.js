'use strict'
window.addEventListener('DOMContentLoaded', () => {
  const buttonGenerate = document.querySelector('#btn-generate')
  if (buttonGenerate) {
    buttonGenerate.addEventListener('click', async () => {
      const text = document.querySelector('#qrcode-text')
      if (text) {
        try {
          const response = await backendBridge.sendData(text.value)
          //console.log(response)
          const img = document.querySelector('#generated-qr-code')
          if (img) {
            img.src = response
          }
        } catch (err) {
          console.warn(err)
        }
      }
    })
  }
})