export default function Description({ children }: { children: React.ReactNode }) {
    return (
        <div className='text-gray-700 dark:text-white mb-4'>
            <p>
                {children}
            </p>
        </div>
    );
}
