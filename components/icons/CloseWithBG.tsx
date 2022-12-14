const CloseWithBG = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_114_819)">
        <path 
          d="M4.1074 4.10744C0.866494 7.34835 0.866495 12.6517 4.1074 15.8926C7.34831 19.1335 12.6516 19.1335 15.8925 15.8926C19.1334 12.6516 19.1334 7.34835 15.8925 4.10744C12.6516 0.866536 7.34831 0.866537 4.1074 4.10744ZM12.9462 8.23223L11.1785 10L12.9462 11.7678C13.2998 12.1213 13.2998 12.5927 12.9462 12.9463C12.5927 13.2998 12.1213 13.2998 11.7677 12.9463L9.99996 11.1785L8.23219 12.9463C7.87864 13.2998 7.40723 13.2998 7.05368 12.9463C6.70013 12.5927 6.70013 12.1213 7.05368 11.7678L8.82145 10L7.05368 8.23223C6.70013 7.87868 6.70013 7.40727 7.05368 7.05372C7.40723 6.70017 7.87864 6.70017 8.23219 7.05372L9.99996 8.82149L11.7677 7.05372C12.1213 6.70017 12.5927 6.70017 12.9462 7.05372C13.2998 7.40727 13.2998 7.87868 12.9462 8.23223Z" 
          fill="#FD8043"
        />
      </g>
      <defs>
        <clipPath id="clip0_114_819">
          <rect 
            width="20" 
            height="20" 
            fill="white" 
            transform="translate(0 20) rotate(-90)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CloseWithBG;
