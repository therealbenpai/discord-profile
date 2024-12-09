/* eslint-disable @next/next/no-img-element */
export default function ProfileImage({ link, name }: { link: string, name: string }) {
    return (
        <div className="flex flex-col items-center justify-center">
            <img
                src={link}
                alt={name}
                className='m-8 rounded-full max-w-sm w-1/2 border-black border dark:border-white'
            />
        </div>
    );
}
