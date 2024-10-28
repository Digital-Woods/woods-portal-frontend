const Attachments = ({ attachments = [] }) => {
    const FileIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" /></svg>
    );

    return (
        <div className="flex items-start">
            <ul class="list-none inline-block max-w-full">
                {attachments.map((attachment) => (
                    <li className="p-2 bg-slate-200 border border-slate-300 rounded-sm mt-2 flex gap-1 text-sm flex items-center">
                        <FileIcon />
                        <div class="flex gap-1">
                            <a href={attachment.url} class="font-medium text-blue-600 dark:text-blue-500 hover:underline" target="_blank">{attachment.name}</a>
                            <span>({attachment.size})</span>
                        </div>
                    </li>
                ))
                }
            </ul>
        </div>
    );
};
