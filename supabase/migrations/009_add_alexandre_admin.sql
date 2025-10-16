-- Add alexandre@digiqo.fr as super admin
INSERT INTO admin_users (email, role, is_active)
VALUES ('alexandre@digiqo.fr', 'super_admin', true)
ON CONFLICT (email) DO UPDATE SET is_active = true, role = 'super_admin';
