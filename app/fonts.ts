import localFont from 'next/font/local'

export const vulfMono = localFont({
  src: [
    {
      path: '../public/fonts/VulfMonoDemo-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/VulfMonoDemo-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/VulfMonoDemo-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/VulfMonoDemo-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/VulfMonoDemo-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/VulfMonoDemo-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-vulf-mono',
  display: 'swap',
})