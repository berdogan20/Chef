using System;
using Chef.Domain.Entities;

namespace Chef.Dtos
{
	public record OrderDto(

        string OrderId,
        DateTime OrderDate,
        string OrderOwner,
        string Address,
        string Status);
}

