// base on the  course  only admin as the right to see all and every thing
// for my project ???

// this check who is requesting what id  == goes just after user odj in single product
const checkPermission = (requestUser, resourceUserId) => {
  console.log(requestUser);
  console.log(resourceUserId);
  console.log(typeof resourceUserId);

  //   if (requestUser.role === "admin ") return; // ne peut acceder que s il est admin
  //   if (resourceUserId.userId === resourceUserId.toString()) return;
  //   console.log("no access ");
};
// module.exports = { checkPermission };
