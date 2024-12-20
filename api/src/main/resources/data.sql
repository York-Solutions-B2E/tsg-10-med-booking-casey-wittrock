--> Specialization Seed
INSERT INTO specialization (id, name) 
VALUES 
    (1, 'Cardiologist'), 
    (2, 'Pediatrics'), 
    (3, 'Dermatology'), 
    (4, 'Orthopedics'), 
    (5, 'Neurology')
ON CONFLICT (id) DO NOTHING;

--> Doctor Seed

INSERT INTO doctor (id, first_name, last_name, email, phone, address, specialization_id)
VALUES
(1, 'Paul', 'Patayshun', 'hart.throb@healthcare.com', '555-0101', '123 Heartbeat Ln', 1),
(2, 'Angie', 'O''Gram', 'angie.ogram@healthcare.com', '555-0102', '456 Pulse Dr', 1),
(3, 'Teddy', 'Bare', 'pedia.tricks@healthcare.com', '555-0201', '789 Childcare St', 2),
(4, 'Chuck', 'Cheese', 'kidd.cure@healthcare.com', '555-0202', '321 Playground Blvd', 2),
(5, 'Phill', 'Depores', 'dermot.logy@healthcare.com', '555-0301', '654 Skin Ave', 3),
(6, 'Rash', 'Izichy', 'rash.decision@healthcare.com', '555-0302', '987 Epidermis Rd', 3),
(7, 'Izzy', 'Brokun', 'ortho.pedic@healthcare.com', '555-0401', '135 Bone St', 4),
(8, 'Artie', 'Fishall', 'artie.culation@healthcare.com', '555-0402', '246 Joint Ave', 4),
(9, 'Brian', 'Lobe', 'neuro.surge@healthcare.com', '555-0501', '357 Brain Blvd', 5),
(10, 'Allan', 'Zheimer', 'axon.potential@healthcare.com', '555-0502', '468 Neuron Rd', 5),
(11, 'Ben', 'Dover', 'patella.kneecap@healthcare.com', '555-0601', '159 Joint Ct', 4),
(12, 'Scarlet', 'Fever', 'scarlet.fever@healthcare.com', '555-0602', '753 Epidermis Cir', 3)
ON CONFLICT (id) DO NOTHING;

--> Schedule Seed. Add 3 days of slots for each doctor. Days can be any random day between 2024-12-13 and 2024-12-23, but not weekends
INSERT INTO slot (id, duration, status, date, time, doctor_id)
VALUES
--Doctor 1 (Paul Patayshun)
(1, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:00', 1),
(2, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:30', 1),
(3, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:00', 1),
(4, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:30', 1),
(5, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:00', 1),
(6, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:30', 1),
(7, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:00', 1),
(8, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:30', 1),
(9, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:00', 1),
(10, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:30', 1),
(11, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:00', 1),
(12, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:30', 1),
(13, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:00', 1),
(14, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:30', 1),
(15, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:00', 1),
(16, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:30', 1),

--Doctor 2 (Angie O'Gram)
(17, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:00', 2),
(18, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:30', 2),
(19, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:00', 2),
(20, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:30', 2),
(21, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:00', 2),
(22, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:30', 2),
(23, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:00', 2),
(24, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:30', 2),
(25, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:00', 2),
(26, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:30', 2),
(27, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:00', 2),
(28, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:30', 2),
(29, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:00', 2),
(30, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:30', 2),
(31, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:00', 2),
(32, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:30', 2),
--Doctor 3 (Teddy Bare)
(33, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:00', 3),
(34, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:30', 3),
(35, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:00', 3),
(36, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:30', 3),
(37, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:00', 3),
(38, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:30', 3),
(39, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:00', 3),
(40, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:30', 3),
(41, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:00', 3),
(42, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:30', 3),
(43, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:00', 3),
(44, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:30', 3),
(45, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:00', 3),
(46, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:30', 3),
(47, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:00', 3),
(48, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:30', 3),
--Doctor 4 (Chuck Cheese)
(49, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:00', 4),
(50, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:30', 4),
(51, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:00', 4),
(52, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:30', 4),
(53, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:00', 4),
(54, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:30', 4),
(55, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:00', 4),
(56, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:30', 4),
(57, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:00', 4),
(58, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:30', 4),
(59, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:00', 4),
(60, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:30', 4),
(61, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:00', 4),
(62, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:30', 4),
(63, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:00', 4),
(64, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:30', 4),
--Doctor 5 (Phill Depores)
(65, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:00', 5),
(66, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:30', 5),
(67, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:00', 5),
(68, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:30', 5),
(69, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:00', 5),
(70, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:30', 5),
(71, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:00', 5),
(72, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:30', 5),
(73, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:00', 5),
(74, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:30', 5),
(75, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:00', 5),
(76, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:30', 5),
(77, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:00', 5),
(78, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:30', 5),
(79, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:00', 5),
(80, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:30', 5),
--Doctor 6 (Rash Izichy)
(81, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:00', 6),
(82, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:30', 6),
(83, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:00', 6),
(84, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:30', 6),
(85, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:00', 6),
(86, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:30', 6),
(87, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:00', 6),
(88, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:30', 6),
(89, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:00', 6),
(90, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:30', 6),
(91, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:00', 6),
(92, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:30', 6),
(93, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:00', 6),
(94, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:30', 6),
(95, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:00', 6),
(96, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:30', 6),
--Doctor 7 (Izzy Brokun)
(97, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:00', 7),
(98, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:30', 7),
(99, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:00', 7),
(100, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:30', 7),
(101, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:00', 7),
(102, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:30', 7),
(103, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:00', 7),
(104, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:30', 7),
(105, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:00', 7),
(106, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:30', 7),
(107, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:00', 7),
(108, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:30', 7),
(109, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:00', 7),
(110, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:30', 7),
(111, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:00', 7),
(112, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:30', 7),
--Doctor 8 (Artie Fishall)
(113, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:00', 8),
(114, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:30', 8),
(115, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:00', 8),
(116, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:30', 8),
(117, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:00', 8),
(118, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:30', 8),
(119, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:00', 8),
(120, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:30', 8),
(121, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:00', 8),
(122, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:30', 8),
(123, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:00', 8),
(124, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:30', 8),
(125, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:00', 8),
(126, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:30', 8),
(127, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:00', 8),
(128, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:30', 8),
--Doctor 9 (Brian Lobe)
(129, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:00', 9),
(130, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:30', 9),
(131, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:00', 9),
(132, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:30', 9),
(133, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:00', 9),
(134, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:30', 9),
(135, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:00', 9),
(136, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:30', 9),
(137, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:00', 9),
(138, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:30', 9),
(139, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:00', 9),
(140, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:30', 9),
(141, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:00', 9),
(142, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:30', 9),
(143, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:00', 9),
(144, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:30', 9),

--Doctor 10 (Allan Zheimer)
(145, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:00', 10),
(146, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:30', 10),
(147, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:00', 10),
(148, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:30', 10),
(149, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:00', 10),
(150, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:30', 10),
(151, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:00', 10),
(152, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:30', 10),
(153, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:00', 10),
(154, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:30', 10),
(155, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:00', 10),
(156, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:30', 10),
(157, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:00', 10),
(158, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:30', 10),
(159, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:00', 10),
(160, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:30', 10),
--Doctor 11 (Ben Dover)
(161, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:00', 11),
(162, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:30', 11),
(163, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:00', 11),
(164, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:30', 11),
(165, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:00', 11),
(166, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:30', 11),
(167, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:00', 11),
(168, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:30', 11),
(169, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:00', 11),
(170, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:30', 11),
(171, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:00', 11),
(172, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:30', 11),
(173, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:00', 11),
(174, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:30', 11),
(175, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:00', 11),
(176, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:30', 11),
--Doctor 12 (Scarlet Fever)
(177, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:00', 12),
(178, 'MEDIUM', 'AVAILABLE', '2024-12-16', '09:30', 12),
(179, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:00', 12),
(180, 'MEDIUM', 'AVAILABLE', '2024-12-16', '10:30', 12),
(181, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:00', 12),
(182, 'MEDIUM', 'AVAILABLE', '2024-12-16', '11:30', 12),
(183, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:00', 12),
(184, 'MEDIUM', 'AVAILABLE', '2024-12-16', '12:30', 12),
(185, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:00', 12),
(186, 'MEDIUM', 'AVAILABLE', '2024-12-16', '13:30', 12),
(187, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:00', 12),
(188, 'MEDIUM', 'AVAILABLE', '2024-12-16', '14:30', 12),
(189, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:00', 12),
(190, 'MEDIUM', 'AVAILABLE', '2024-12-16', '15:30', 12),
(191, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:00', 12),
(192, 'MEDIUM', 'AVAILABLE', '2024-12-16', '16:30', 12)
ON CONFLICT (id) DO NOTHING;

--> slots with dates before 2024-12-09 to test past date filtering

INSERT INTO slot (id, duration, status, date, time, doctor_id)
VALUES
(193, 'MEDIUM', 'AVAILABLE', '2024-12-08', '09:00', 1),
(194, 'MEDIUM', 'AVAILABLE', '2024-12-08', '09:30', 1),
(195, 'MEDIUM', 'AVAILABLE', '2024-12-08', '10:00', 1),
(196, 'MEDIUM', 'AVAILABLE', '2024-12-08', '10:30', 1),
(197, 'MEDIUM', 'AVAILABLE', '2024-12-09', '11:00', 1),
(198, 'MEDIUM', 'AVAILABLE', '2024-12-09', '11:30', 1),
(199, 'MEDIUM', 'AVAILABLE', '2024-12-08', '12:00', 1),
(200, 'MEDIUM', 'AVAILABLE', '2024-12-08', '12:30', 1),
(201, 'MEDIUM', 'AVAILABLE', '2024-12-08', '13:00', 1),
(202, 'MEDIUM', 'AVAILABLE', '2024-12-09', '13:30', 1),
(203, 'MEDIUM', 'AVAILABLE', '2024-12-08', '14:00', 1),
(204, 'MEDIUM', 'AVAILABLE', '2024-12-08', '14:30', 1),
(205, 'MEDIUM', 'AVAILABLE', '2024-12-09', '15:00', 1),
(206, 'MEDIUM', 'AVAILABLE', '2024-12-09', '15:30', 1),
(207, 'MEDIUM', 'AVAILABLE', '2024-12-08', '16:00', 1),
(208, 'MEDIUM', 'AVAILABLE', '2024-12-09', '01:00', 1)
ON CONFLICT (id) DO NOTHING;

--> Slots with status 'BOOKED' to test filtering
INSERT INTO slot (id, duration, status, date, time, doctor_id)
VALUES
(209, 'MEDIUM', 'BOOKED', '2024-12-16', '09:00', 1),
(210, 'MEDIUM', 'BOOKED', '2024-12-16', '09:30', 1),
(211, 'MEDIUM', 'BOOKED', '2024-12-16', '10:00', 1),
(212, 'MEDIUM', 'BOOKED', '2024-12-16', '10:30', 1),
(213, 'MEDIUM', 'BOOKED', '2024-12-16', '11:00', 1),
(214, 'MEDIUM', 'BOOKED', '2024-12-16', '11:30', 1),
(215, 'MEDIUM', 'BOOKED', '2024-12-16', '12:00', 1),
(216, 'MEDIUM', 'BOOKED', '2024-12-16', '12:30', 1),
(217, 'MEDIUM', 'BOOKED', '2024-12-16', '13:00', 1),
(218, 'MEDIUM', 'BOOKED', '2024-12-16', '13:30', 1),
(219, 'MEDIUM', 'BOOKED', '2024-12-16', '14:00', 1),
(220, 'MEDIUM', 'BOOKED', '2024-12-16', '14:30', 1),
(221, 'MEDIUM', 'BOOKED', '2024-12-16', '15:00', 1),
(222, 'MEDIUM', 'BOOKED', '2024-12-16', '15:30', 1),
(223, 'MEDIUM', 'BOOKED', '2024-12-16', '16:00', 1),
(224, 'MEDIUM', 'BOOKED', '2024-12-16', '16:30', 1)
ON CONFLICT (id) DO NOTHING;

--> Test users
-- INSERT INTO app_user (id, username, password, role)
-- VALUES
-- (1, 'admin', 'admin', 'ADMIN'),
-- (2, 'patient', 'patient', 'PATIENT'),
-- (3, 'testuser', 'password', 'PATIENT');

--> Seed for Patient profile for app_user with id 2

-- INSERT INTO patient (id, first_name, last_name, email, phone, address, gender, dob)
-- VALUES
-- (1, 'John', 'Doe', 'jon@doe.com', '555-1233', '123 Main', 1, '1990-01-01');

-- --> set patient_id for app_user with id 2
-- UPDATE app_user SET patient_profile_id = 1 WHERE id = 2;


