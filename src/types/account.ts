export enum BalanceType {
    Debit = 'DEBIT',
    Credit = 'CREDIT'
}

export type Account = {
    name: string;
    parentAccount?: string;
    balance: number;
    balanceType: BalanceType;
}