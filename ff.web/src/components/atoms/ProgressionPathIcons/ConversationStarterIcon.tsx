import { SVGProps } from 'react';

interface ConversationStarterIconProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

export default function ConversationStarterIcon({ color = '#ffffff' }: ConversationStarterIconProps) {
    return (
        <svg
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill={color}
            stroke={color}
        >
            <g>
                <path d="M371.415,183.131c17.758,0,34.83,2.371,50.873,6.644c-17.414-79.136-104.446-139.34-209.451-139.34 C95.288,50.435,0,125.809,0,218.804c0,59.291,38.78,111.379,97.336,141.368l-33.002,73.796 c62.089-6.899,122.958-23.217,169.422-38.27c-17.91-21.933-28.024-48.236-28.024-76.266 C205.732,244.275,280.058,183.131,371.415,183.131z" />
                <path d="M512,319.432c0-61.428-62.947-111.213-140.585-111.213c-77.647,0-140.595,49.785-140.595,111.213 c0,46.914,36.736,87.006,88.678,103.344c28.259,10.976,88.286,31.929,150.008,38.789L447.7,412.819 C486.382,393.012,512,358.603,512,319.432z" />
            </g>
        </svg>
    );
}