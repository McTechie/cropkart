// default imports
import BrandFooter from './BrandFooter'

const footerItems: { [key: string]: string[] }[] = [
  { 
    'Get to Know Us': [
      'About Us',
      'Careers',
      'Press Releases',
      'CropKart Cares',
      'Gift a Smile',
      'CropKart Science'
    ]
  },
  {
    'Connect with Us': [
      'Facebook',
      'Twitter',
      'Instagram',
    ]
  },
  {
    'Make Money with Us': [
      'Sell on CropKart',
      'Sell under CropKart Accelerator',
      'CropKart Global Selling',
      'Become an Affiliate',
      'Fulfilment by CropKart',
      'Advertise Your Products',
      'CropKart Pay on Merchants',
    ]
  },
  {
    'Let Us Help You': [
      'COVID-19 and CropKart',
      'Your Account',
      'Returns Centre',
      '100% Purchase Protection',
      'CropKart App Download',
      'CropKart Assistant Download',
      'Help',
    ]
  }
]

const Footer = () => {
  return (
    <footer className='pt-2'>
      <button
        className='w-full p-4 bg-gray-200 text-gray-600 text-[0.9rem] hover:bg-gray-100 transition-all duration-300 ease-in-out border-2'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Back to top
      </button>
      
      <div className='flex items-start sm:justify-between lg:justify-evenly flex-grow bg-emerald-600 px-2 lg:px-20 xl:px-28 pt-14 pb-16 text-white'>
        {footerItems.map((footerItem, idx) => {
          const currentFooterItem = Object.keys(footerItem)[0]
          const item: string[] = footerItem[currentFooterItem]

          return (
            <div key={idx} className='px-2 md:px-5'>
              <h5 className='font-bold pb-3 text-xs md:text-sm xl:text-lg'>{currentFooterItem}</h5>
              <ul className='flex flex-col space-y-2 text-[0.6rem] xl:text-sm font-bold text-gray-100'>
                {item.map((footerLink, linkIdx) => (
                  <li key={linkIdx} className='font-light hover:underline cursor-pointer inline-flex'>
                    {footerLink}
                  </li>
                ))}
              </ul>
            </div>
          )})}
      </div>

      <div className='w-full h-[0.1rem] bg-gray-600' />

      <BrandFooter />
    </footer>
  )
}
 
export default Footer
