import { Icon } from '@iconify-icon/react';

/**
 * SocialIcon component
 * 
 * Use <https://icon-sets.iconify.design/> to find the icon you want to use.
 * @param {Object} param0 The Properties
 * @param {string} param0.link The link to the social media profile
 * @param {string} param0.pack What Icon Pack to use
 * @param {string} param0.icon The icon name
 * @param {string} param0.title The title of the social media profile
 */
export default function SocialIcon({ link, pack, icon, title }: { link: string, pack: string, icon: string, title: string }) {
    const baseClasses = 'hover:text-indigo-500 p-0 no-underline items-center self-center justify-center my-1 text-gray-700 text-5xl size-24';
    return (
        <div className='justify-evenly size-24 flex content-center'>
            <a href={link} target='_blank' className={baseClasses} title={title} rel='me'>
                <Icon icon={`${pack}:${icon}`} className={baseClasses + " flex"} />
            </a>
        </div>
    );
}
