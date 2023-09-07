using System;
namespace Chef.Dtos
{
	public record OrderDto(
		Guid Id,
		string OrderOwner,
		string Address,
		string Status);
}

