export interface ITooltipHeader {
    title: string;
    subTitle?: string;
}

export interface ITooltipBody {
    error?: string;
    description: string;
    progress?: ITooltipProgress[];
}

export interface ITooltipProgress {
    progressValue?: number;
    completionValue?: number;
    description: string;
}

export interface ITooltipAction {
    description?: string;
    completionTime: number;
    callback?: () => void;
}

export interface ITooltip {
    header: ITooltipHeader;
    body?: ITooltipBody;
    action?: ITooltipAction;
}

export interface ITooltipProps {
    x: number;
    y: number;
    isHovered: boolean;
    pressing: boolean;
}
