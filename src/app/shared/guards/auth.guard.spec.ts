import { AuthGuard } from './auth.guard';

class MockRouter {
  navigate(path) {}
}

describe('AuthGuard', () => {
  describe('canActivate', () => {
    let authGuard: AuthGuard;
    let authService;
    let router;

    it('should return true for a logged in user', () => {
      authService = { isAuthenticated: () => true };
      router = new MockRouter();
      authGuard = new AuthGuard(authService, router);

      expect(authGuard.canActivate()).toEqual(true);
    });
  });
});
