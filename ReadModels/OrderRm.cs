using System;
namespace Chef.ReadModels
{
	public record OrderRm(
		Guid Id,
		string OrderOwner,
		string Address,
		string Status);
}

