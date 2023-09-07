using System;
namespace Chef.Dtos
{
	public record UserDto(
        string Email,
        string FirstName,
        string LastName,
        string Password);
}

