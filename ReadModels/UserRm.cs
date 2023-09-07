using System;
namespace Chef.ReadModels
{
	public record UserRm(
        string Email,
        string FirstName,
        string LastName,
        string Password);
}

