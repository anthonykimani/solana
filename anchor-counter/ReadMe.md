### 1. Initialize a Solana Program

initialize the program using the command `anchor init <project-name>`

### 2. Generate a Keypair for your Program

Running `anchor build` will also generate a keypair for your new program - the keys are saved in the target/deploy directory.

### 3. Sync your Anchor Keys

Run `anchor keys sync` will update the key used in `declare_id!()` and the key in `anchor.toml`

### 4. Add Instruction_One instruction

This instruction will be called within the program to set the instruction data when the program is initialized.

```rust
#[program]
mod program_module_name {
	use super::*;
	pub fn instruction_one(ctx: Context<InstructionAccounts>, instruction_data: u64) -> Result<()>{
		ctx.accounts.account_name.data = instruction_data;
		Ok(())
	}
}
```
### 5. Define Instruction Accounts

The Accounts trait defines a data structure of validated accounts. Structs adopting this trait define the list of accounts required for a given instruction. ==> #[derive(Accounts)]

```rust
#[derive(Accounts)]
pub struct InstructionAccounts {
	#[account(init, payer = user, space = 8 + 8)]
	pub account_name: Account<'info, AccountStruct>,
	#[account(mut)]
	pub user: Signer<'info>,
	pub system_program: Program<'info, System>,
}
```

This accounts are then exposed through an instruction's `Context` so that manual account serialization and deserialization is no longer necessary.

For example, `instruction_one` requires a Context argument of type `InstructionAccounts`. The #[derive(Accounts)] macro is used to implement the `InstructionAccounts` struct which includes three accounts: `account_name`, user, and `system_program`.

```rust
#[program]
mod program_module_name {
	use super::*;
	pub fn instruction_one(ctx: Context<InstructionAccounts>, instruction_data: u64) -> Result<()>{
		ctx.accounts.account_name.data = instruction_data;
		Ok(())
	}
}
```

### 6. Implement Context type AccountStruct

```rust
pub struct AccountStruct {
	data: u64,
}
```

### 7. Run your Solana Program

Run `anchor build` to compile your solana program and test it with `anchor test`