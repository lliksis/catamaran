export interface ITooltipHeader {
    title: string;
    subTitle?: string;
}

export interface ITooltipBody {
    description: string;
}

export interface ITooltip {
    header: ITooltipHeader;
    body?: ITooltipBody;
}
