export default function Statement({ main, sub }: { main: string, sub?: string }) {
    return (
        <>
            <h2 className="select-none font-poppins text-3xl font-medium text-neutral-900">{main}</h2>
            {sub && (
                <p className="select-none font-poppins text-xl text-neutral-700">{sub}</p>
            )}
        </>
    );
}
