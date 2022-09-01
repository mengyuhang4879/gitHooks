import Submit from './page/approvalProcess/submit';
import Approval from './page/approvalProcess/approval';

export const routerItems = [
    {
        path: '/',
        Component: Submit
    },
    {
        path: '/approval',
        Component: Approval
    }
];
