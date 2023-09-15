using System;
using Chef.Domain.Entities;

namespace Chef.ReadModels
{
	public record UserRm(
        string Email,
        string Password,
        string Address);
}

