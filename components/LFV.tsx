type Parameters = {
    val: string;
    description: string;
}

export default function LFV({ val, description }: Parameters) {
    return (
        <div className="flex flex-col items-center space-y-2">
            <h2 className="elect-none font-poppins text-3xl font-bold text-neutral-900">{val}</h2>
            <p className="select-none font-poppins text-xl text-neutral-700">{description}</p>
        </div>
    );
}
