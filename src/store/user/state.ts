interface AccountFeatures {
  account_balance_available: boolean;
  can_change_subscription: boolean;
  can_unregister: boolean;
  have_adult_content: boolean;
  payment_available: boolean;
}

export interface UserState {
  features: AccountFeatures;
  loaded: boolean;
  isLoggedIn: boolean;
}

export const initialUserState: UserState = {
  features: {
    account_balance_available: false,
    can_change_subscription: false,
    can_unregister: false,
    have_adult_content: false,
    payment_available: false,
  },
  loaded: false,
  isLoggedIn: false,
}