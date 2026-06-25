'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import useHorizontalNav from '@menu/hooks/useHorizontalNav'

// Util Imports
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks
  const { isBreakpointReached } = useHorizontalNav()

  return (
    <div
      className={classnames(horizontalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      <p>
        <span>{`© ${new Date().getFullYear()}, Developed `}</span>
        <span>{` by `}</span>
        <Link href='https://mediakolaborasi.com/' target='_blank' className='font-medium text-white'>
          ANDIRA MEDIA (AM) Technology
        </Link>
      </p>
      {!isBreakpointReached && (
        <div className='flex items-center gap-4'>
         <div className='flex items-center gap-4'>
           <Link
            href='https://mediakolaborasi.com'
            target='_blank'
            className='text-primary'
          >
            Dokumentasi
          </Link>
          <Link href='https://mediakolaborasi.com' target='_blank' className='text-primary'>
            Bantuan
          </Link>
        </div>
        </div>
      )}
    </div>
  )
}

export default FooterContent
