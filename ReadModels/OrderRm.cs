using System;
using Chef.Domain.Entities;

namespace Chef.ReadModels
{
	public record OrderRm(
        string OrderId,
        DateTime OrderDate,
        string OrderOwner,
        string Address,
        string Status);
}

