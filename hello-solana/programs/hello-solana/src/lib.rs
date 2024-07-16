use anchor_lang::prelude::*;

// a macro for declaring the program’s onchain address
declare_id!("Ao4ZwVeuVpUu8zqFrN6mcBnWvckEqkPAN1VuPCh6FmoU");

// an attribute macro used to denote the module containing the program’s instruction logic
#[program]
pub mod hello_solana {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn instruction_one(ctx: Context<InstructionAccounts>, instruction_data: u64) -> Result<()> {
        ctx.accounts.account_name.data = instruction_data;
        Ok(())
    }
}

// a trait applied to structs representing the list of accounts required for an instruction
#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct InstructionAccounts<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    pub account_name: Account<'info, AccountStruct>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,

}

#[account]
pub struct AccountStruct {
    data: u64
}
