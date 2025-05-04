export default function Logo() {
    return (
        <div className="flex justify-center">
            <svg
                width="80"
                height="80"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-glow"
            >
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <path
                    d="M32 2C20.3 2 11 11.3 11 23c0 6.7 3.2 12.8 8.3 16.7V46a3 3 0 003 3h3v3a3 3 0 003 3h4a3 3 0 003-3v-3h3a3 3 0 003-3v-6.3C49.8 35.8 53 29.7 53 23 53 11.3 43.7 2 32 2z"
                    fill="#016630"
                    filter="url(#glow)"
                />
                <path
                    d="M26 54h12v2a2 2 0 01-2 2h-8a2 2 0 01-2-2v-2z"
                    fill="#014d27"
                />
            </svg>
        </div>

    )
}